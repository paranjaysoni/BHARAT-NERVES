import { PrismaClient } from "@prisma/client";
import type { CorridorRoute, RouteStatus } from "../../types/route.types.js";

const prisma = new PrismaClient();

export async function getAllRoutes(): Promise<CorridorRoute[]> {
  const routes = await prisma.route.findMany();
  return routes as unknown as CorridorRoute[];
}

export async function getRouteById(id: string): Promise<CorridorRoute | null> {
  const route = await prisma.route.findUnique({ where: { id } });
  return route as unknown as CorridorRoute | null;
}

export async function getRoutesByStatus(status: RouteStatus): Promise<CorridorRoute[]> {
  const routes = await prisma.route.findMany({ where: { status } });
  return routes as unknown as CorridorRoute[];
}
