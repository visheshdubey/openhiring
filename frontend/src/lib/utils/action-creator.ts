import { z } from "zod";

export type FieldErrors<T> = {
    [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
    fieldErrors?: FieldErrors<TInput>;
    error?: string | null;
    data?: TOutput;
};

export type SafeActionHandler<TInput, TOutput> = (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>;

export const createSafeAction = <TInput, TOutput>(
    schema: z.Schema<TInput>,
    handler: SafeActionHandler<TInput, TOutput>,
) => {
    return async (data: unknown): Promise<ActionState<TInput, TOutput>> => {
        try {
            const validationResult = schema.safeParse(data);

            if (!validationResult.success) {
                return {
                    fieldErrors: validationResult.error.flatten().fieldErrors as FieldErrors<TInput>,
                };
            }

            return await handler(validationResult.data);
        } catch (error) {
            console.error("Unexpected error in safe action:", error);
            return {
                error: "An unexpected error occurred. Please try again later.",
            };
        }
    };
};
