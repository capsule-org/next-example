import { useEffect, useState } from "react";
import { CapsuleModal } from "@usecapsule/react-sdk";

export const EmailSignup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [Modal, setCapsuleModalComponent] = useState<
    typeof CapsuleModal | null
  >(null);
  const [capsuleInstance, setCapsuleInstance] = useState<any>(null);

  async function loadCapsule() {
    let loadedInstance;
    if (!capsuleInstance) {
      const CapsuleModule = await import("@usecapsule/react-sdk");
      loadedInstance = new CapsuleModule.default(
        CapsuleModule.Environment.DEVELOPMENT,
        process.env.NEXT_PUBLIC_CAPSULE_API_KEY
      );
    }
    return loadedInstance;
  }

  useEffect(() => {
    // Perform localStorage action
    setShouldRender(true);
    loadCapsule().then((capsule) => {
      setCapsuleInstance(capsule);
    });
  }, []);

  useEffect(() => {
    async function loadCapsuleModule() {
      const { CapsuleModal } = await import("@usecapsule/react-sdk");
      setCapsuleModalComponent(() => CapsuleModal);
    }
    loadCapsuleModule();
  }, []);

  useEffect(() => {
    loadCapsule().then((capsule) => {
      setCapsuleInstance(capsule);
    });
  }, []);

  if (!Modal || !capsuleInstance || !shouldRender) return null;

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Open Capsule
      </button>
      <Modal
        capsule={capsuleInstance}
        appName={"NextJS Example"}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </>
  );
};
