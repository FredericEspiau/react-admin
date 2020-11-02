import {
    useShowController,
    ShowProps,
    ShowControllerProps,
} from './useShowController';
import { Translate } from '../../types';
import { useTranslate } from '../../i18n';
import { useResourceContext, useResourceDefinition } from '../../core';

interface ShowControllerComponentProps extends ShowControllerProps {
    translate: Translate;
}

interface Props extends ShowProps {
    children: (params: ShowControllerComponentProps) => JSX.Element;
}

/**
 * Render prop version of the useShowController hook
 *
 * @see useShowController
 * @example
 *
 * const ShowView = () => <div>...</div>
 * const MyShow = props => (
 *     <ShowController {...props}>
 *         {controllerProps => <ShowView {...controllerProps} {...props} />}
 *     </ShowController>
 * );
 */
export const ShowController = ({ children, ...props }: Props) => {
    const { resource } = useResourceContext(props);
    const { hasCreate, hasEdit, hasList, hasShow } = useResourceDefinition(
        resource,
        props
    );
    // @deprecated. hasCreate, hasEdit, hasList and hasShow are injected for backward compatibility
    const controllerProps = useShowController({
        resource,
        hasCreate,
        hasEdit,
        hasList,
        hasShow,
        ...props,
    });
    // @deprecated. injected for backward compatibility
    const translate = useTranslate();
    return children({ translate, ...controllerProps });
};
