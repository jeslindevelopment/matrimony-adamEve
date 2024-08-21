const { Seeder } = require('mongoose-data-seed');
const Subscription = require('../models/mongodb/subscription')

const data = [
  {
    name: "Free",
    fee: 0,
    validity: "unlimited",
    freeContacts: "unlimited",
    profileType: "Normal",
    contactAllowed: "unlimited",
    photosAllowed: "unlimited"
  },
  {
    name: "Executive",
    fee: 500,
    validity: "1",
    freeContacts: "5",
    profileType: "Normal",
    contactAllowed: 1,
    photosAllowed: 1
  },
  {
    name: "Premium",
    fee: 1200,
    validity: "1",
    freeContacts: "30",
    profileType: "Premium",
    contactAllowed: 2,
    photosAllowed: 2
  },
  {
    name: "Secret",
    fee: 3000,
    validity: "1",
    freeContacts: "unlimited",
    profileType: "Premium",
    contactAllowed: 2,
    photosAllowed: 2
  },
];

class SubscribeSeeder extends Seeder {

  async shouldRun() {
    return Subscription.getCount({}).then(count => count === 0);
  }

  async run() {
    await Promise.all(data.map(e => {
      return Subscription.add(e);
    }))
  }
}

module.exports = SubscribeSeeder;
