import { Mutation, MutationKey, MutationFunction, useQueryClient, useMutation } from "@tanstack/react-query";
import { on } from "events";

    export const useMutationData = (mutationkey:MutationKey, mutationfunction:MutationFunction <any,any>,
    queryKey?:string,
    onSuccess?: ()=>void
    ) => {
            const client=useQueryClient();
            useMutation()
    }