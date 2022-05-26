const responseGenerator = (
    data: any,
    message: string | null = null,
    error: boolean = false,
    token: string | null = null
) => {
    return {
        error,
        message,
        data,
        token,
    };
};

export default responseGenerator;
