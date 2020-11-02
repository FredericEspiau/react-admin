import { Translate } from '../../types';
import { useTranslate } from '../../i18n';
import {
    useCreateController,
    CreateProps,
    CreateControllerProps,
} from './useCreateController';
import { useResourceContext, useResourceDefinition } from '../../core';

interface CreateControllerComponentProps extends CreateControllerProps {
    translate: Translate;
}

interface Props extends CreateProps {
    children: (params: CreateControllerComponentProps) => JSX.Element;
}

/**
 * Render prop version of the useCreateController hook
 *
 * @see useCreateController
 * @example
 *
 * const CreateView = () => <div>...</div>
 * const MyCreate = props => (
 *     <CreateController {...props}>
 *         {controllerProps => <CreateView {...controllerProps} {...props} />}
 *     </CreateController>
 * );
 */
export const CreateController = ({ children, ...props }: Props) => {
    const { resource } = useResourceContext(props);
    const { hasEdit, hasShow } = useResourceDefinition(resource, props);
    // @deprecated. hasEdit and hasShow are injected for backward compatibility
    const controllerProps = useCreateController({
        resource,
        hasEdit,
        hasShow,
        ...props,
    });
    // @deprecated. injected for backward compatibility
    const translate = useTranslate();
    return children({ translate, ...controllerProps });
};
