import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addWord} from "../../composables/dictionaryApi";
import AddWordForm from "./AddWordForm";
import axios from "axios";
import {PageCenter} from '../../components/PageCentr';


export default function AddWordPage() {
    const navigate = useNavigate();
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);

    const handleAddWord = async (word: string, translate: string) => {
        if (!word || !translate) {
            setAddError("Both fields are required");
            return;
        }
        try {
            setAddLoading(true);
            setAddError(null);

            await addWord({word, translate});
            navigate('/words');
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setAddError(err.response?.data?.message ?? "Failed to add word");
            } else {
                setAddError("Unexpected error");
            }
        } finally {
            setAddLoading(false);
        }
    };

    return (
        <PageCenter>
            <AddWordForm
                onSubmit={handleAddWord}
                loading={addLoading}
                error={addError}
            />
        </PageCenter>
    );
}