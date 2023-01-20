import {expect} from '@jest/globals';
import { TextSms } from '../lib';

describe('splitter', () => {
    let SMS_MSG_LENGTH: number;

    test('short, error', () => {
        const fn = () => {
            SMS_MSG_LENGTH = 9;
            const input = 'a aa aaa a aa aa aaa aaaa a aa aa aa aa aa aa aa aaaa';
            TextSms(input, SMS_MSG_LENGTH);
        }

        expect(fn).toThrow()
    });

    test('short', () => {
        SMS_MSG_LENGTH = 9;
        const input = 'a aa aaa a aa aa aaa aaaa a aa aa aa aa aa aa aa aaa';
        const ar = TextSms(input, SMS_MSG_LENGTH);

        const result = [
            'a aa 1/14', 'aaa 2/14', 'a aa 3/14', 'aa 4/14', 'aaa 5/14',  'aaaa 6/14', 'a aa 7/14', 'aa 8/14', 'aa 9/14',   'aa 10/14', 'aa 11/14',  'aa 12/14', 'aa 13/14',  'aaa 14/14'
        ];

        for ( let i = 0; i < ar.length; i++ ) {
            expect(ar[i]).toEqual(result[i]);
        }
    });

    test('lorem 1', () => {
        SMS_MSG_LENGTH = 140;
        const input = 'Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut suscipit velit efficitur eget Sed sit amet posuere risus';
        const ar = TextSms(input, SMS_MSG_LENGTH);

        expect(ar[0]).toEqual('Lorem ipsum dolor sit amet consectetur adipiscing elit Nullam eleifend odio at magna pretium suscipit Nam commodo mauris felis ut 1/2');
        expect(ar[1]).toEqual('suscipit velit efficitur eget Sed sit amet posuere risus 2/2');
    });

    test('lorem 2', () => {
        SMS_MSG_LENGTH = 140;
        const input = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
        const ar = TextSms(input, SMS_MSG_LENGTH);

        expect(ar[0]).toEqual('Lorem ipsum dolor sit amet consectetur adipiscing elit');
    });
});