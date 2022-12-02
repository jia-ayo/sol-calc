import assert from 'assert';
import * as anchor from '@project-serum/anchor';
import { AnchorProvider, web3 } from '@project-serum/anchor';
const { SystemProgram } = web3;

describe('testapp', () => {
  const provider = AnchorProvider.local();
  anchor.setProvider(provider);
  const calculator = anchor.web3.Keypair.generate();
  const program = anchor.workspace.Testapp;

  it('creates a calculator', async () => {
    await program.rpc.create("welcome to Calc", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    });
    const account = await program.account.calculator.fetch(
      calculator.publicKey
    );
    assert.ok(account.greeting === "welcome to Calc");
  });
});