VAGRANTFILE_API_VERSION = "2"

PROJECT_NAME = "acme"
PROJECT_HOSTNAME = PROJECT_NAME + ".dev"
PROJECT_PORT = 10000

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|


  ## This machine is 'www'
  config.vm.define "www" do |www|

    www.vm.box = "ubuntu/trusty64"

    ## Picked up by vagrant-hostsupdater plugin
    www.vm.hostname = PROJECT_HOSTNAME

    ## Give the VM 2 virtual CPUs
    www.vm.provider :virtualbox do |vb|
      vb.customize ["modifyvm", :id, "--cpus", "2" ]
    end

    ## A private link between host & VM
    ## Probably best to use a reserved address, 192.168.0.0/16 or 10.0.0.0/8
    www.vm.network "private_network", ip: "192.168.191.11"
    www.vm.network "forwarded_port", guest: PROJECT_PORT, host: PROJECT_PORT

    ## Map the local parent folder to /var/www/24ways on the VM
    www.vm.synced_folder ".", "/var/www/"+PROJECT_NAME, type: "nfs"

    ## This script will be executed on the VM
    www.vm.provision :shell, :path => "vagrant/provision.sh"

  end

end
