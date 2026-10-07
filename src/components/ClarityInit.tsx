'use client';
import clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export default function ClarityInit() {
  useEffect(() => {
    clarity.init('wci0l3750r');
  }, []);
  return null;
}
