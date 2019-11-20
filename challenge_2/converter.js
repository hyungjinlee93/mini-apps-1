module.exports = (obj) => {
  let report = {};
  let megaArray = [];
  report.heading = ['firstName','lastName','county','city','role','sales']
  report.firstName = [];
  report.lastName = [];
  report.county = [];
  report.city = [];
  report.role = [];
  report.sales = [];
  let helper = (obj2) => {
    report.firstName.push(obj2.firstName);
    report.lastName.push(obj2.lastName);
    report.county.push(obj2.county);
    report.city.push(obj2.city);
    report.role.push(obj2.role);
    report.sales.push(obj2.sales.toString());
    if(obj2.children.length) {
      for(let i = 0; i < obj2.children.length; i++) {
        helper(obj2.children[i]);
      }
    }
  }
  helper(obj);
  megaArray.push(report.heading.join(','));
  megaArray[0] += '\n';
  for(let j = 0; j < report.firstName.length; j++) {
    megaArray.push(report.firstName[j]+','+report.lastName[j]+','+report.county[j]+','+report.city[j]+','+report.role[j]+','+report.sales[j]+'\n');
  }
  return megaArray.join('');
}