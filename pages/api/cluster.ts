import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export type ClusterMember = {
  port: number;
  ip: string;
  name: string;
  id: string;
  status: string; // 'online' | 'pending'
};

export type IGetClusterMember = {
  error: string;
  members: ClusterMember[];
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(await getCluster());
}

export async function getCluster() {
  await updateCluster();
  const instances = await prisma.instance.findMany();
  return {
    error: 'OK',
    members: instances.map((instance) => ({
      port: instance.port,
      ip: instance.ip,
      name: instance.name,
      id: instance.id,
      status: instance.status,
    })),
  }
}

async function updateCluster() {
  const onlineNumbers = await prisma.instance.count({
    where: {
      status: 'online',
    },
  });
  
  const elects = await prisma.elect.findMany();
  
  elects.forEach(async (elect) => {    
    const electee = await prisma.instance.findUnique({
      where: {
        id: elect.electeeId,
      },
    });
    
    if (!electee) {
      // delete elect and votes
      await prisma.elect.delete({
        where: {
          id: elect.id,
        },
      });
      await prisma.vote.deleteMany({
        where: {
          electId: elect.id,
        },
      });
      return;
    }
    
    const votes = await prisma.vote.findMany({
      where: {
        electId: elect.id,
      },
    });
    
    if (votes.length > onlineNumbers / 2 || onlineNumbers === 0) {
      if (electee.status === 'pending') {
        await prisma.instance.update({
          where: {
            id: electee.id,
          },
          data: {
            status: 'online',
          },
        });
        await prisma.elect.deleteMany({
          where: {
            electeeId: electee.id,
          },
        });
        await prisma.vote.deleteMany({
          where: {
            electId: elect.id,
          },
        });
      } else if (electee.status === 'online') {
        await prisma.instance.delete({
          where: {
            id: electee.id,
          },
        });
        await prisma.elect.deleteMany({
          where: {
            OR: [
              {
                creatorId: electee.id,
              },
              {
                electeeId: electee.id,
              },
            ],
          },
        });
        await prisma.vote.deleteMany({
          where: {
            OR: [
              {
                electId: elect.id,
              },
              {
                voterId: electee.id,
              }
            ]
          },
        }); 
      }
    }
    
  });
}