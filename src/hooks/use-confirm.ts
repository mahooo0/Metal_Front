import { useState } from "react";

interface UseConfirmOptions {
  onConfirm: () => void;
  defaultTitle?: string;
  defaultDescription?: string;
}

export function useConfirm({
  onConfirm,
  defaultTitle = "Підтвердити дію",
  defaultDescription = "Ви впевнені, що хочете виконати цю дію?",
}: UseConfirmOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [description, setDescription] = useState(defaultDescription);

  const open = (options?: { title?: string; description?: string }) => {
    if (options?.title) setTitle(options.title);
    if (options?.description) setDescription(options.description);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    // Сбрасываем на значения по умолчанию при закрытии
    setTitle(defaultTitle);
    setDescription(defaultDescription);
  };

  const confirm = () => {
    onConfirm();
    close();
  };

  return {
    isOpen,
    open,
    close,
    confirm,
    title,
    description,
  };
}

