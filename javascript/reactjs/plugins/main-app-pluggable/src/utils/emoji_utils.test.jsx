import React from 'react';

import {compareEmojis, wrapEmojis} from './emoji_utils';

describe('compareEmojis', () => {
    test('should sort an array of emojis alphabetically', () => {
        const goatEmoji = {
            name: 'goat',
        };

        const dashEmoji = {
            name: 'dash',
        };

        const smileEmoji = {
            name: 'smile',
        };

        const emojiArray = [goatEmoji, dashEmoji, smileEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b));

        expect(emojiArray).toEqual([dashEmoji, goatEmoji, smileEmoji]);
    });

    test('should have partial matched emoji first', () => {
        const goatEmoji = {
            short_name: 'goat',
            short_names: ['goat'],
        };

        const dashEmoji = {
            short_name: 'dash',
            short_names: ['dash'],
        };

        const smileEmoji = {
            short_name: 'smile',
            short_names: ['smile'],
        };

        const emojiArray = [goatEmoji, dashEmoji, smileEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b, 'smi'));

        expect(emojiArray).toEqual([smileEmoji, dashEmoji, goatEmoji]);
    });

    test('should be able to sort on aliases', () => {
        const goatEmoji = {
            short_names: [':goat:'],
            short_name: ':goat:',
        };

        const dashEmoji = {
            short_names: [':dash:'],
            short_name: ':dash:',
        };

        const smileEmoji = {
            short_names: [':smile:'],
            short_name: ':smile:',
        };

        const emojiArray = [goatEmoji, dashEmoji, smileEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b));

        expect(emojiArray).toEqual([dashEmoji, goatEmoji, smileEmoji]);
    });

    test('special case for thumbsup emoji should sort it before thumbsdown by aliases', () => {
        const thumbsUpEmoji = {
            short_names: ['+1'],
            short_name: '+1',
        };

        const thumbsDownEmoji = {
            short_names: ['-1'],
            short_name: '-1',
        };

        const smileEmoji = {
            short_names: ['smile'],
            short_name: 'smile',
        };

        const emojiArray = [thumbsDownEmoji, thumbsUpEmoji, smileEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b));

        expect(emojiArray).toEqual([thumbsUpEmoji, thumbsDownEmoji, smileEmoji]);
    });

    test('special case for thumbsup emoji should sort it before thumbsdown by names', () => {
        const thumbsUpEmoji = {
            short_name: 'thumbsup',
        };

        const thumbsDownEmoji = {
            short_name: 'thumbsdown',
        };

        const smileEmoji = {
            short_name: 'smile',
        };

        const emojiArray = [thumbsDownEmoji, thumbsUpEmoji, smileEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b));

        expect(emojiArray).toEqual([smileEmoji, thumbsUpEmoji, thumbsDownEmoji]);
    });

    test('special case for thumbsup emoji should sort it when emoji is matched', () => {
        const thumbsUpEmoji = {
            short_name: 'thumbsup',
        };

        const thumbsDownEmoji = {
            short_name: 'thumbsdown',
        };

        const smileEmoji = {
            short_name: 'smile',
        };

        const emojiArray = [thumbsDownEmoji, thumbsUpEmoji, smileEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b, 'thumb'));

        expect(emojiArray).toEqual([thumbsUpEmoji, thumbsDownEmoji, smileEmoji]);
    });

    test('special case for thumbsup emoji should sort custom "thumb" emojis after system', () => {
        const thumbsUpEmoji = {
            short_names: ['+1', 'thumbsup'],
            category: 'default',
        };

        const thumbsDownEmoji = {
            short_name: 'thumbsdown',
            category: 'default',
        };

        const thumbsUpCustomEmoji = {
            short_name: 'thumbsup-custom',
            category: 'custom',
        };

        const emojiArray = [thumbsUpCustomEmoji, thumbsDownEmoji, thumbsUpEmoji];
        emojiArray.sort((a, b) => compareEmojis(a, b, 'thumb'));

        expect(emojiArray).toEqual([thumbsUpEmoji, thumbsDownEmoji, thumbsUpCustomEmoji]);
    });
});

describe('wrapEmojis', () => {
    // Note that the keys used by some of these may appear to be incorrect because they're counting Unicode code points
    // instead of just characters. Also, if these tests return results that serialize to the same string, that means
    // that the key for a span is incorrect.

    test('should return the original string if it contains no emojis', () => {
        const input = 'this is a test 1234';

        expect(wrapEmojis(input)).toBe(input);
    });

    test('should wrap a single emoji in a span', () => {
        const input = '🌮';

        expect(wrapEmojis(input)).toEqual(
            <span
                key='0'
                className='emoji'
            >
                {'🌮'}
            </span>,
        );
    });

    test('should wrap a single emoji in a span with surrounding text', () => {
        const input = 'this is 🌮 a test 1234';

        expect(wrapEmojis(input)).toEqual([
            'this is ',
            <span
                key='8'
                className='emoji'
            >
                {'🌮'}
            </span>,
            ' a test 1234',
        ]);
    });

    test('should wrap multiple emojis in spans', () => {
        const input = 'this is 🌮 a taco 🎉 1234';

        expect(wrapEmojis(input)).toEqual([
            'this is ',
            <span
                key='8'
                className='emoji'
            >
                {'🌮'}
            </span>,
            ' a taco ',
            <span
                key='18'
                className='emoji'
            >
                {'🎉'}
            </span>,
            ' 1234',
        ]);
    });

    test('should properly handle adjacent emojis', () => {
        const input = '🌮🎉🇫🇮🍒';

        expect(wrapEmojis(input)).toEqual([
            <span
                key='0'
                className='emoji'
            >
                {'🌮'}
            </span>,
            <span
                key='2'
                className='emoji'
            >
                {'🎉'}
            </span>,
            <span
                key='4'
                className='emoji'
            >
                {'🇫🇮'}
            </span>,
            <span
                key='8'
                className='emoji'
            >
                {'🍒'}
            </span>,
        ]);
    });

    test('should properly handle unsupported emojis', () => {
        const input = 'this is 🤟 a test';

        expect(wrapEmojis(input)).toEqual([
            'this is ',
            <span
                key='8'
                className='emoji'
            >
                {'🤟'}
            </span>,
            ' a test',
        ]);
    });

    test('should properly handle emojis with variations', () => {
        const input = 'this is 👍🏿👍🏻 a test ✊🏻✊🏿';

        expect(wrapEmojis(input)).toEqual([
            'this is ',
            <span
                key='8'
                className='emoji'
            >
                {'👍🏿'}
            </span>,
            <span
                key='12'
                className='emoji'
            >
                {'👍🏻'}
            </span>,
            ' a test ',
            <span
                key='24'
                className='emoji'
            >
                {'✊🏻'}
            </span>,
            <span
                key='27'
                className='emoji'
            >
                {'✊🏿'}
            </span>,
        ]);
    });

    test('should return a one character string if it contains no emojis', () => {
        const input = 'a';

        expect(wrapEmojis(input)).toBe(input);
    });

    test('should properly wrap an emoji followed by a single character', () => {
        const input = '🌮a';

        expect(wrapEmojis(input)).toEqual([
            <span
                key='0'
                className='emoji'
            >
                {'🌮'}
            </span>,
            'a',
        ]);
    });
});
