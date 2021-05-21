interface Result {
	success: boolean;
	errMsg?: string;
	data: any;
}

export const getResData = (data: any, errMsg?: string): Result => {
	if (errMsg) {
		return {
			success: false,
			errMsg,
			data,
		};
	} else {
		return {
			success: true,
			data,
		};
	}
};
