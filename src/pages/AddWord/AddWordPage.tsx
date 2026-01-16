import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {addWord} from "../../composables/dictionaryApi";
import {addWordAutoTranslate} from "../../composables/dictionaryApi";
import AddWordForm from "./AddWordForm";
import AddWordAutoForm from "./AddWordAutoForm";
import axios from "axios";
import {PageCenter} from '../../components/PageCentr';


export default function AddWordPage() {
    const navigate = useNavigate();
    const [addLoading, setAddLoading] = useState(false);
    const [addError, setAddError] = useState<string | null>(null);
    const [showManualForm, setShowManualForm] = useState(false);
    const [currentWord, setCurrentWord] = useState("");

    const handleAutoAdd = async (word: string) => {
        if (!word) {
            setAddError("Please enter a word");
            return;
        }
        try {
            setAddLoading(true);
            setAddError(null);
            setCurrentWord(word);

            await addWordAutoTranslate({word});
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


    const handleSwitchToManual = () => {
        setShowManualForm(true);
        setAddError(null);
    };

    const handleBackToAuto = () => {
        setShowManualForm(false);
        setAddError(null);
    };
    return (
        <PageCenter>
            {!showManualForm ? (
                <AddWordAutoForm
                    onSubmit={handleAutoAdd}
                    onSwitchToManual={handleSwitchToManual}
                    loading={addLoading}
                    error={addError}
                    showManualOption={addError?.includes("Unknown word:")}
                />
            ) : (
                <AddWordForm
                    onSubmit={handleAddWord}
                    onBack={handleBackToAuto}
                    initialWord={currentWord}
                    loading={addLoading}
                    error={addError}
                />
            )}
        </PageCenter>
    );
}