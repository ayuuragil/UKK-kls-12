import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllUser = async(req, res) => {
    try {
        const result = await prisma.user.findMany()
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: MessageChannel.error
        })
    }
};

export const getUserById = async(req, res) => {
    try {
        const result = await prisma.user.findUnique({
            where:{
                id_user: req.params.id
            }
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: MessageChannel.error
        })
    }
};

export const addUser = async (req, res) => {
  try {
    const { nama, username, password, telp, alamat, role } = req.body;
    const result = await prisma.user.create({
      data: { 
        name_user: nama,
        username: username, 
        password: password,
        telp: telp,
        alamat : alamat,
        role: role
       }
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) {
   console.log(error);
        res.json({
            msg: MessageChannel.error
        })   
  }
};

export const updateUser = async(req, res) => {
    try {
        const {nama, username, password, telp, alamat, role} = req.body
        const result = await prisma.user.update({
            where:{
                id_user: req.params.id
            },
            data:{
                name_user: nama,
                username: username, 
                password: password,
                telp: telp,
                alamat : alamat,
                role: role
            }
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: MessageChannel.error
        })
    }
};

export const deleteUser = async(req, res) => {
    try {
        const result = await prisma.user.delete({
            where:{
                id_user : req.params.id
            }
        })
        res.status(200).json({
            success: true,
            data: result
        })
    } catch (error) {
        console.log(error)
        res.json({
            msg: MessageChannel.error
        })
    }
};