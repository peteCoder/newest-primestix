import { sanityClient } from "@/lib/sanityClient";

export const getAllNewsExceptId = async (id) => {
  const query = `*[_type == "newsBlog" && _id != '${id}' ]{
        _id,
        title,
        body, 
        bannerImage{
            asset->{
                url
            }
        },
        _createdAt
    }`;

  const news = await sanityClient.fetch(query);
  return news;
};
