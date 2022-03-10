# aws_s3_bucket for lambda function
# aws_s3 bucket for the www


resource "aws_s3_bucket" "mvp" {
  bucket = "mvp.${local.dns_hosted_zone_name}"
}

resource "aws_s3_bucket_website_configuration" "mvp" {
  bucket = aws_s3_bucket.mvp.bucket

  index_document {
    suffix = "index.html"
  }
}
resource "aws_s3_bucket_policy" "public" {
  bucket = aws_s3_bucket.mvp.id
  policy = data.aws_iam_policy_document.public.json
}

data "aws_iam_policy_document" "public" {
  statement {
    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    actions = [
      "s3:GetObject",
    ]

    resources = [
      "${aws_s3_bucket.mvp.arn}/*",
    ]
  }
}
