import { describe, expect, it } from 'vitest';
import type { xdr } from '@stellar/stellar-sdk';
import { SecurityError } from './error-handler';
import { validateSimulationAuth } from './soroban';

describe('validateSimulationAuth', () => {
  it('throws SecurityError when simulation includes an extra unexpected auth entry', () => {
    const unexpectedAuthEntry = {} as xdr.SorobanAuthorizationEntry;

    const simResult = {
      result: {
        auth: [unexpectedAuthEntry, unexpectedAuthEntry],
      },
    };

    expect(() =>
      validateSimulationAuth(simResult, [
        {
          contractId: 'CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABSC4',
          functionName: 'unlock_assets',
        },
      ]),
    ).toThrow(SecurityError);
  });
});
