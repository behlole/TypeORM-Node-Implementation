import {Request, Response} from "express";
import User from "../models/User";
import Book from "../models/Books";
import RequestResponseMappings from "../../../Shared/utils/Mappings/RequestResponseMappings";
import Books from "../models/Books";

export default {
    addBook:async (req: Request, res: Response) => {
        let bookNames=req.body.bookNames;
        let user=req.body.user;
        let currentUser=await User.findOneBy({email:user.email});
        if(currentUser) {
            let books = [];
            for (const singleBook of bookNames) {
                let book = Book.create({bookName: singleBook,user:currentUser})
                await book.save()
                books.push(book)
            }
            return RequestResponseMappings.sendSuccessMessage(res,currentUser);
        }
        return RequestResponseMappings.sendErrorMessage(res);

    },
    getBooks:async (req: Request, res: Response) => {
        try {
            if (req.params && req.params.id) {
                let book = await Book.findOne({
                    where:
                        {
                            id: parseInt(req.params.id)
                        },
                    relations:
                        {
                            user: true,
                        }
                });
                return RequestResponseMappings.sendSuccessMessage(res, book);
            } else {
                let books = await Book.find({
                    relations:
                        {
                            user: true
                        }
                })
                return RequestResponseMappings.sendSuccessMessage(res, books);
            }
        }catch (e:any) {
            return RequestResponseMappings.sendErrorMessage(res,e.message)
        }
    },
}