terraform {
  backend "s3" {
    bucket = "reiblok.com-lambda-functions"
    key    = "/.ssh/Berkeleyplatte_accessKeys.csv"
    region = "us-east-1"
  }
}