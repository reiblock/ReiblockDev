terraform {
  backend "s3" {
    bucket = "reiblock-terraform-state-backend"
    key    = "reiblock-terraform.tfstate"
    region = "us-east-1"

  }
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}
