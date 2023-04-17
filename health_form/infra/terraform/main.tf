variable "subnet_prefix" {}
variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_region" {}
variable "aws_ami" {}
variable "aws_instance_key" {}

provider "aws" {
  region     = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}


# # 1. Create vpc

resource "aws_vpc" "prod-vpc" {
  cidr_block = "10.0.0.0/16"
  tags = {
    Name = "production"
  }
}

# # 2. Create Internet Gateway

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.prod-vpc.id
}

# # 3. Create Custom Route Table

resource "aws_route_table" "prod-route-table" {
  vpc_id = aws_vpc.prod-vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }

  route {
    ipv6_cidr_block = "::/0"
    gateway_id      = aws_internet_gateway.gw.id
  }

  tags = {
    Name = "Prod"
  }
}

# # 4. Create a Subnet 

resource "aws_subnet" "subnet-1" {
  vpc_id            = aws_vpc.prod-vpc.id
  cidr_block        = "10.0.1.0/24"
  availability_zone = "us-east-2a"

  tags = {
    Name = "prod-subnet"
  }
}

# # 5. Associate subnet with Route Table
resource "aws_route_table_association" "a" {
  subnet_id      = aws_subnet.subnet-1.id
  route_table_id = aws_route_table.prod-route-table.id
}
# 6. Create Security Group to allow port 22,80,443
resource "aws_security_group" "allow_web" {
  name        = "allow_web_traffic"
  description = "Allow Web inbound traffic"
  vpc_id      = aws_vpc.prod-vpc.id

  ingress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "allow_web"
  }
}

# # 7. Create a network interface with an ip in the subnet that was created in step 4

resource "aws_network_interface" "web-server-nic" {
  subnet_id       = aws_subnet.subnet-1.id
  private_ips     = ["10.0.1.50"]
  security_groups = [aws_security_group.allow_web.id]

}
# 8. Assign an elastic IP to the network interface created in step 7

resource "aws_eip" "one" {
  vpc                       = true
  network_interface         = aws_network_interface.web-server-nic.id
  associate_with_private_ip = "10.0.1.50"
  depends_on                = [aws_internet_gateway.gw, aws_instance.web-server-instance]
}

output "server_public_ip" {
  value = aws_eip.one.public_ip
}

# # 9. Create Ubuntu server and install/enable apache2

resource "aws_instance" "web-server-instance" {
  ami               = var.aws_ami
  instance_type     = "t2.micro"
  availability_zone = "us-east-2a"
  key_name          = var.aws_instance_key

  network_interface {
    device_index         = 0
    network_interface_id = aws_network_interface.web-server-nic.id
  }

  user_data = <<-EOF
                #!/bin/bash

                echo "ssh-rsa YOUR-PREDEFINED-PUBLIC-KEY-HERE" >> /home/ubuntu/.ssh/authorized_keys

                echo "* soft nproc 65535" >> /etc/security/limits.conf
                echo "* hard nproc 65535" >> /etc/security/limits.conf
                echo "* soft nofile 1048576" >> /etc/security/limits.conf
                echo "* hard nofile 1048576" >> /etc/security/limits.conf
                echo "" >> /etc/security/limits.conf
                echo "linuxhint soft nproc 100000" >> /etc/security/limits.conf
                echo "linuxhint hard nproc 100000" >> /etc/security/limits.conf
                echo "linuxhint soft nofile 1048576" >> /etc/security/limits.conf
                echo "linuxhint hard nofile 1048576" >> /etc/security/limits.conf

                groupadd harold -g 1001
                groupadd docker -g 998
                useradd docker -g docker -u 998
                useradd -rm -d /home/harold -s /bin/bash -g harold -G harold -u 1001 harold
                usermod -a -G harold ubuntu
                usermod -a -G docker ubuntu
                usermod -a -G docker harold

                echo "harold ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

                sudo apt update
                sudo apt upgrade -y
                sudo apt install docker.io net-tools unzip jq iptraf zip curl wget -y
                sudo systemctl start docker.io

                sudo reboot
                EOF
  tags = {
    Name = "web-server"
  }
}



# output "server_private_ip" {
#   value = aws_instance.web-server-instance.private_ip

# }

# output "server_id" {
#   value = aws_instance.web-server-instance.id
# }


# resource "<provider>_<resource_type>" "name" {
#     config options.....
#     key = "value"
#     key2 = "another value"
# }
