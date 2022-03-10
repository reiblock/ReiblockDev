data "aws_route53_zone" "public" {
  name = local.dns_hosted_zone_name
}

output "dns_hosted_zones" {
  value = data.aws_route53_zone.public.name

}


