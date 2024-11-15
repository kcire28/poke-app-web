export const handleResponse = async (promise) => {
  try {
    const response = await promise
    return {
      status: true,
      data: response?.data ?? {},
      message: '',
    }
  } catch (error) {
    return {
      status: false,
      data: {},
      message:
        error?.response?.data?.message ??
        'Ocurrió un problema, intenténtalo luego',
    }
  }
}
