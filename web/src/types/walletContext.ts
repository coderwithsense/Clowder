export interface WalletContextProps {
    address: string;
    isLoading: boolean;
    balance: string;
    connect: () => void;
    disconnect: () => void;
}