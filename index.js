var ZWave = require('openzwave-shared');

module.exports = function(Heim, options) {
	var zwave = new ZWave();

	zwave.on('driver ready', function(homeid) {
		Heim.Log('notice', 'OpenZWave: scanning homeid=0x'+homeid.toString(16)+'...')
	});

	zwave.on('driver failed', function() {
	    Heim.Log('error', 'OpenZWave: Failed to start driver...');
	    zwave.disconnect();
	});

	zwave.on('node ready', function(id, info) {
		Heim.Devices.updateOrRegister({
			provider: 'openzwave',
			id: id,
			name: info.name,
			vendor: nodeinfo.manufacturer,
			type: 'switch',
			ready: true,
			on: function() {
				zwave.setNodeOn(id);
			},
			off: function() {
				zwave.setNodeOff(id);
			},
			level: function(level) {
				zwave.setLevel(id, level);
			}
		});
	});

	zwave.on('value changed', function(nodeid, comclass, value) {

	});
};
