import {apiClient} from "./useClient";
import type {IrregularVerbDto} from '../models/models';

export const getIrregularVerbs = () => {
    return apiClient.get<IrregularVerbDto[]>("/verbs");
};