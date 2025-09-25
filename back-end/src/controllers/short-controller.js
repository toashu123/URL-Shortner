import { nanoid } from "nanoid";
import { addURL,getSmallToBig, listUrlsByEmail, deleteUrlById } from "../services/url-service.js";

export const getBigURL = async(req,res)=>{
    const {code} = req.params;
    console.log('Code is ',code);
    // res.json({message:'Rec code'});
    try{
    const doc = await getSmallToBig(code);
    console.log("Doc found:", doc);
    if(doc && doc._id){
        res.redirect(doc.bigurl);
    }
    else{
        res.json({message:'Invalid Small URL'})
    }
    }
    catch(err){
        res.json({message:'Invalid Small URL',err})
    }
}

export const urlShort = async(req,res)=>{
    const bigurl = req.body.bigurl;
    console.log('Big URL',bigurl)
    try{
    const num = nanoid(6);
    const email = req.user?.email || req.body.email;
    console.log('listMyUrls email=', email);
    const doc = await addURL({email, shortid:num,bigurl:bigurl})
    if(doc && doc._id){
    res.json({shorturl:process.env.BASE_URL+'small/'+num});
    }
    else{
        res.json({error:'Something went wrong'});
    }
    }
    catch(err){
        console.log('Error in short URL',err);
        res.json({error:'Something went wrong',err});
    }
}

export const listMyUrls = async (req, res) => {
  try {
    // replace with real auth: req.user.email; for now read from header or fallback
    const email = req.user?.email || req.headers['x-user-email'] || req.query.email;
    if (!email) return res.status(401).json({ error: 'Unauthorized' });

    const rows = await listUrlsByEmail(email);
    console.log('rows:', rows.length);

    const base = process.env.BASE_URL?.replace(/\/+$/,'') || '';

    const urls = rows.map(r => ({
      id: r._id.toString(),
      original: r.bigurl,
      short: base ? `${base}/small/${r.shortid}` : `/small/${r.shortid}`,
      createdAt: r.createdAt,
      clicks: r.clicks ?? 0
    }));
    res.json(urls);
  } catch (e) {
    res.status(500).json({ error: 'Failed to load URLs' });
  }
};

export const deleteMyUrl = async (req, res) => {
  try {
    const email = req.user?.email || req.headers['x-user-email'] || req.query.email;
    if (!email) return res.status(401).json({ error: 'Unauthorized' });

    const { id } = req.params;
    const doc = await deleteUrlById(id, email);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'Delete failed' });
  }
};