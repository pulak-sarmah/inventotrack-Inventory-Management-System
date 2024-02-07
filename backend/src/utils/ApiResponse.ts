class ApiResponse {
  statusCode: number;
  data: any;
  message: string;

  constructor(statusCode: number, data: any, message: string = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
export { ApiResponse };
