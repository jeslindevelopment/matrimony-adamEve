import { Seeder } from 'mongoose-data-seed';
import { Model } from '../server/models';

const data = [
  {
    name: "Executive ",
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
    return Model.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return Model.create(data);
  }
}

export default SubscribeSeeder;
