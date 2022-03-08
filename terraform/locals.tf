locals {
  project       = "reiblock-mvp"
  author        = "Vihar Chokshi"
  email_address = "vc@iot4.net"

  dns_hosted_zone_name = "reiblok.com"

  common_tags = {
    Owner = local.author
    Email = local.email_address
  }
}
