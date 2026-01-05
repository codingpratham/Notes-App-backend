import zod from "zod";
export const Login=zod.object({
    email:zod.string().email(),
    password:zod.string().min(8)
})


export const Register=zod.object({
    name:zod.string().min(3),
    email:zod.string().email(),
    password:zod.string().min(8)

}) 