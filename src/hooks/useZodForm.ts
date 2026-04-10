import { UseMutateFunction } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z, { ZodSchema } from "zod";

const useZodForm = (schema:ZodSchema, mutation: UseMutateFunction, defaultValues?: any) => {
const {} = useForm()
}
export default useZodForm