# The glue that allows the frontend to talk to the backend.

resource "aws_api_gateway_rest_api" "hw" {
  name        = "Hello_World"
  description = "Hello World API Gateway"
  endpoint_configuration {
    types = ["REGIONAL"]
  }
}


resource "aws_api_gateway_resource" "hw" {
  rest_api_id = aws_api_gateway_rest_api.hw.id
  parent_id   = aws_api_gateway_rest_api.hw.root_resource_id
  path_part   = "hello_world"
}

resource "aws_api_gateway_method" "post" {
  rest_api_id   = aws_api_gateway_rest_api.hw.id
  resource_id   = aws_api_gateway_resource.hw.id
  http_method   = "POST"
  authorization = "NONE"
}

resource "aws_api_gateway_integration" "i" {
  rest_api_id = aws_api_gateway_rest_api.hw.id
  resource_id = aws_api_gateway_method.post.resource_id
  http_method = aws_api_gateway_method.post.http_method

  integration_http_method = "POST"
  type                    = "AWS"
}

resource "aws_api_gateway_method_response" "response_200" {
  rest_api_id = aws_api_gateway_rest_api.hw.id
  resource_id = aws_api_gateway_resource.hw.id
  http_method = aws_api_gateway_method.post.http_method
  status_code = "200"
}

resource "aws_api_gateway_integration_response" "r" {
  rest_api_id = aws_api_gateway_rest_api.hw.id
  resource_id = aws_api_gateway_resource.hw.id
  http_method = aws_api_gateway_method.post.http_method
  status_code = aws_api_gateway_method_response.response_200.status_code
}

resource "aws_api_gateway_deployment" "hw" {
  rest_api_id = aws_api_gateway_rest_api.hw.id
  stage_name  = "prod"
}

resource "aws_api_gateway_base_path_mapping" "hw" {
  api_id      = aws_api_gateway_rest_api.hw.id
  stage_name  = aws_api_gateway_deployment.hw.stage_name
  base_path   = "hello_world"
}


