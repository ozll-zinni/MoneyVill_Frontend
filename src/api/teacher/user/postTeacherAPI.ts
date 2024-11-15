import { formDataInstance } from "@/api/instance"
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes"

type paramsType = {
	body: {
		name: string
		identity: string
		password: string
		checkedPassword: string
	}
}

type responseType = {
	status: number
	data: successReturnType | errorReturnType
}

export const postTeacherAPI = async ({ body }: paramsType) => {
	try {
		const response: responseType = await formDataInstance.post("/teacher", body)

		return response.data
	} catch (error) {
		throw error
	}
}
