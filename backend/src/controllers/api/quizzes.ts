import { RequestHandler } from 'express';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../../models/User';
import ErrorHandler from '../../utils/ErrorHandler';
import ServiceRegistry from '../../services/ServiceRegistry';
import QuizDTO from '../../DTO/QuizDTO';
import { IQuiz } from '../../models/Quiz';
import QuizDAO from '../../DAO/QuizDAO';

export const createQuiz: RequestHandler<
    {},
    any,
    {
        title: string;
        description: string;
        askedInformation: {
            firstname: boolean;
            lastname: boolean;
            age: boolean;
            email: boolean;
            address: boolean;
            phone: boolean;
        }
    },
    {},
    {
        user: HydratedDocument<IUser>
    }
> = async (req, res, next) => {
    const services = req.app.get('services') as ServiceRegistry;

    let quizDTO = new QuizDTO({
        createdBy: res.locals.user._id,
        title: req.body.title,
        description: req.body.description,
        askedInformation: req.body.askedInformation,
        questions: [],
        isPublished: false
    });

    try {
        const quiz = await services.quizService.createQuiz(quizDTO);

        quizDTO = new QuizDTO(quiz);

        res.status(201).json({
            ok: true,
            quiz: quizDTO.toObject()
        });
    } catch(err) {
        next(ErrorHandler.handle(err));
    }
}