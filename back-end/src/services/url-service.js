import { urlModel } from "../models/url-schema.js";

 //Lookup logic
export const getSmallToBig =  async(code) => {
  const doc = await urlModel.findOne({shortid:code}).exec();
  return doc;
}


export const addURL = async(urlObject)=>{
    try{
        const doc = await urlModel.create(urlObject);
        return doc;
    }
    catch(err){
        throw err;
    }
}

export const listUrlsByEmail = async (email) => {
  return urlModel.find({ email }).sort({ createdAt: -1 }).select('_id bigurl shortid createdAt clicks').lean().exec();
};

// delete one
export const deleteUrlById = async (id, email) => {
  return urlModel.findOneAndDelete({ _id: id, email }).lean().exec();
};