export enum Testament {
    All,
    Old,
    New
}

export interface OldTestamentBook {
    titles: OldTitles;
    order: OldOrder;
}

export interface OldTitles {
    english: string;
    hebrew: {transliteration: string, meaning: string};
}

export interface OldOrder {
    protestant: {global: number, section: {title: string, sequence: number}};
    hebrew: {global: number, section: {title: string, sequence: number}};
}

export interface NewTestamentBook {
    titles: { english: string };
    order: { global: number, section: { title: string, sequence: number}};
}

export interface BibleModel {
    chapter: number;
    verse: number;
    text: string;
    translation_id: string;
    book_id: string;
    book_name: string
}