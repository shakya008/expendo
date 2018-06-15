function emptyCheck(v) {
	return !!v;
}

function nullCheck(v) {
	return v !== null;
}

function isDefined(v) {
	return v!== null && v!== undefined;
}

module.exports = {
	emptyCheck: emptyCheck,
	nullCheck: nullCheck,
	isDefined: isDefined
}