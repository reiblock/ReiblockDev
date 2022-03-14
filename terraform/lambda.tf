# Deploys the lambda sitting in S3 to AWS lambda
resource "aws_lambda_function" "hw" {
  function_name     = "hello_world"
  description       = "Hello World Microservice"
  s3_bucket         = aws_s3_bucket.lambda.name
  s3_key            = "python/hello_world.zip"
  s3_object_version = ""
  role              = ""
  runtime           = "python3.8"
  handler           = "src.lambda_handler"
  timeout           = 900
}



