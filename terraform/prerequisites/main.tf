# Entry point into the infrastructure
# We create one bucket (file system) in AWS S3 as a stored folder

terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}


# Create an s3 bucket that we can use for the backend

resource "aws_s3_bucket" "backend" {
  bucket = "reiblock-terraform-state-backend"
  tags = {
    Name = "Terraform State Files"
  }
}
