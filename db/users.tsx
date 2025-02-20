


  import { PrismaClient } from "@prisma/client";

  const prisma = new PrismaClient();

  export {prisma};
  
  
  
  
    export const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password:true
      },
    });


