const {Schema,model}= require('mongoose')
const geocoder = require('../utils/geocoder');
const HouseSchema = Schema({
    housename:{type:String},
    description:{type:String},
    district:{type:String},
    sefer:{type:String},
    location: {
        type: {
          type: String,
          default:"Point",
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String
      },
    numberofbeds:{type:Number},
    feepermonth:{type:Number},
    size:{type:Number},
    available:{type: Boolean },
    propertytype:{type:String},
    files:[Object],
    video:{ type: String }
},{timestamps:true})
HouseSchema.index({housename:'text',district:'text',sefer:'text',propertytype:'text'})
HouseSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.district);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress
  };

  // Do not save address
  this.address = undefined;
  next();
});
HouseSchema.method('transform', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    delete obj._id;

    return obj;
});
module.exports = model('house',HouseSchema)

  
  // Geocode & create location
