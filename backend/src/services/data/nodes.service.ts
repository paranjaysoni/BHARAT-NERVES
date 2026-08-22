import { PrismaClient } from "@prisma/client";
import type { InfrastructureNode, NodeStatus } from "../../types/node.types.js";

const prisma = new PrismaClient();

export async function getAllNodes(): Promise<InfrastructureNode[]> {
  const nodes = await prisma.node.findMany();
  return nodes as unknown as InfrastructureNode[];
}

export async function getNodeById(id: string): Promise<InfrastructureNode | null> {
  const node = await prisma.node.findUnique({ where: { id } });
  return node as unknown as InfrastructureNode | null;
}

export async function getNodesByStatus(status: NodeStatus): Promise<InfrastructureNode[]> {
  const nodes = await prisma.node.findMany({ where: { status } });
  return nodes as unknown as InfrastructureNode[];
}
