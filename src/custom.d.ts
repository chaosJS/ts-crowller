// 类型融合 在request上加一个字段
declare namespace Express {
	interface Request {
		myName: string;
	}
}
