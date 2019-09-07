var test = require('tape')
var { matchPAD } = require('./pivotal')
 
test('should match PAD-1419', function (t) {
  t.plan(1)
  var str = '**API** PAD-1949 Reword Campaign KPIs to Global Campaign KPIs on weekly client email'
  var pad = matchPAD(str)
  t.equal(pad, 1949)
});

test('should match a similar string', function(t){
  t.plan(1)
  var str = '**APP** PAD_1926 Increase android location tracking frequency'
  var pad = matchPAD(str)
  t.equal(pad, 1926)
})

test('should match PAD-1892', function (t) {
  t.plan(1)
  var str = 'PAD-1892 New signups should have their needs-legal-review flag set to false,'
  var pad = matchPAD(str)
  t.equal(pad, 1892)
});

test('should match PAD-1058', function (t) {
  t.plan(1)
  var str = '**PAD-1058**: APP AUDIT: "I" [information] button on Browse Missions takes ages to load. (IOS)'
  var pad = matchPAD(str)
  t.equal(pad, 1058)
});

test('should return null', function(t){
  t.plan(1)
  var str = 'Filters on roster page are different to prod'
  var pad = matchPAD(str)
  t.equal(pad, null)
})


