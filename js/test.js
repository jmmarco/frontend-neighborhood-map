var locations = [
	{
		name: 'The Drunken Clam',
		address: '205 Docker St'
	},
	{
		name: 'Pawtucket Brewery',
		address: '1002 Hollister Rd'
	}
];






var AppViewModel = function() {
	self = this;

	this.locations = ko.observable(locations);

};

ko.applyBindings(new AppViewModel());