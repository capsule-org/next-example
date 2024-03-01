import { FC, useEffect, useState } from "react";

const EmailSignup = () => {
  const [Modal, setCapsuleModalComponent] = useState<FC<any> | null>(null);
  const [capsuleInstance, setCapsuleInstance] = useState<any>(null);

  async function loadCapsule() {
    let loadedInstance;
    if (!capsuleInstance) {
      const CapsuleModule = await import("@usecapsule/web-sdk");
      loadedInstance = new CapsuleModule.default(
        CapsuleModule.Environment.DEVELOPMENT,
        process.env.NEXT_PUBLIC_CAPSULE_API_KEY
      );
    }
    return loadedInstance;
  }

  useEffect(() => {
    async function loadCapsuleModule() {
      const { Modal: CapsuleModal } = await import("@usecapsule/web-sdk");
      setCapsuleModalComponent(() => CapsuleModal);
    }
    loadCapsuleModule();
  }, []);

  useEffect(() => {
    loadCapsule().then((capsule) => {
      setCapsuleInstance(capsule);
    });
  }, []);

  if (!Modal || !capsuleInstance) return null;

  return <Modal capsule={capsuleInstance} appName={"MextJS Example"} />;
};

export default EmailSignup;
